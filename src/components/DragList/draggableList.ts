import { Flip } from './flip'
import { isEqual } from 'radash'

const DRAGGING_CLASS = 'dragging'
export const vDragList = {
  /**
   * 在组件挂载时调用，初始化拖拽列表
   *
   * @param el 挂载的DOM元素
   * @param binding Vue指令的绑定值
   */
  mounted(el, binding) {
    debugger
    initDragList(el, binding.value)
  },
  /**
   * 当数据更新时触发的回调函数
   *
   * @param el DOM 元素
   * @param binding Vue 指令绑定对象
   */
  updated(el, binding) {
    // 检查数据是否发生变化,如果数据有返回,则重新初始化拖拽列表
    if (isEqual(binding.value, binding.oldValue)) {
      unmountDragList(el)
      initDragList(el, binding.value)
    }
  },
  /**
   * 卸载组件时调用的方法，用于移除拖拽列表的事件监听器
   *
   * @param el 需要卸载的DOM元素
   */
  unmounted(el) {
    unmountDragList(el)
  }
}

/**
 * 初始化拖拽列表功能
 *
 * @param el 拖拽列表的根元素
 * @param data 列表项的数据
 */
function initDragList(el, data) {
  let currentDragNode = null
  const list = el
  let flip

  console.log(list)

  function getLocation(dom) {
    const rect = dom.getBoundingClientRect()
    return rect.top
  }

  function handleDragStart(e) {
    if (!e.target) return

    flip = new Flip(el.children, 0.5, DRAGGING_CLASS)
    setTimeout(() => {
      e.target.classList.add(DRAGGING_CLASS)
    })

    getLocation(e.target)
    e.dataTransfer.effectAllowed = 'move'
    currentDragNode = e.target
  }

  function handleDragEnter(e) {
    e.preventDefault()

    const target = e.target.closest('.drag-item')

    if (!target || target === currentDragNode || target === el) {
      return
    }

    const children = Array.from(el.children)
    const sourceIndex = children.indexOf(currentDragNode)
    const targetIndex = children.indexOf(target)

    if (sourceIndex < targetIndex) {
      list.insertBefore(currentDragNode, target.nextElementSibling)
    } else {
      list.insertBefore(currentDragNode, target)
    }
    flip.play()
  }

  function handleDragEnd(e) {
    e.preventDefault()
    const updatedData = Array.from(el.children).map((child: HTMLElement) => {
      const item = data.find((i) => i.id === child.dataset.id)
      return item
    })

    el.dispatchEvent(
      new CustomEvent('drag-list-updated', {
        detail: {
          updatedData,
          draggedItemData: updatedData.find((item) => item.id === currentDragNode.dataset.id) || null
        }
      })
    )
    currentDragNode.classList.remove(DRAGGING_CLASS)
  }

  function preventDefault(e) {
    e.preventDefault()
  }

  // 添加事件监听
  el.addEventListener('dragstart', handleDragStart)
  el.addEventListener('dragenter', handleDragEnter)
  el.addEventListener('dragend', handleDragEnd)
  el.addEventListener('dragover', preventDefault)
  el.addEventListener('drop', preventDefault)
  // 注意: 虽然在每个元素绑定的拖拽事件句柄里已经取消了默认事件,但还是要添加全局的拖拽事件来取消默认事件,不然拖拽过程还是会有问题，浏览器的元素默认不允许其他元素拖拽到自身上,不然当我们拖拽元素到目标位置之后放手，会出现拖拽效果的快照先飞回元素原来的位置再到目标位置的一个动效bug
  window.addEventListener('dragenter', preventDefault, false)
  window.addEventListener('dragover', preventDefault, false)
  window.addEventListener('dragend', preventDefault, false)

  // 保存事件处理函数引用以便卸载时移除
  el._dragListHandlers = {
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    preventDefault
  }
}

/**
 * 移除拖拽列表的事件监听器
 *
 * @param el HTML元素，表示拖拽列表的容器
 */
function unmountDragList(el) {
  const { handleDragStart, handleDragEnter, handleDragEnd, preventDefault } = el._dragListHandlers

  el.removeEventListener('dragstart', handleDragStart)
  el.removeEventListener('dragenter', handleDragEnter)
  el.removeEventListener('dragend', handleDragEnd)
  el.removeEventListener('dragover', preventDefault)
  el.removeEventListener('drop', preventDefault)
  window.removeEventListener('dragenter', preventDefault)
  window.removeEventListener('dragover', preventDefault)
  window.removeEventListener('dragend', preventDefault)

  delete el._dragListHandlers
}

// 全局注册
export function registerDragList(app) {
  app.directive('drag-list', vDragList)
}
