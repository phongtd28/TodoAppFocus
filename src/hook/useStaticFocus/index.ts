import React from 'react'
import _ from 'lodash'
type IFocusableElement = HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement | HTMLSpanElement | null | any

export type IFocusOrder = {
    id: string
    focusable: boolean
}

type IParams = {
    focusOrderIds?: (string | number)[]
}

type IEvent = React.KeyboardEvent<HTMLInputElement | HTMLDivElement | HTMLButtonElement>
const isKey = (e: IEvent, key: string) => !e.shiftKey && !e.altKey && e.key === key
export const eventKey = {
    Enter: (e: IEvent) => isKey(e, 'Enter'),
    Tab: (e: IEvent) => isKey(e, 'Tab'),
    ShiftTab: (e: IEvent) => e.shiftKey && e.key === 'Tab',
    ArrowLeft: (e: IEvent) => isKey(e, 'ArrowLeft'),
    ArrowRight: (e: IEvent) => isKey(e, 'ArrowRight')
}

export const FocusDirection = {
    next: 'next',
    previous: 'previous',
    none: 'none'
}

const getActiveElement = () => document.activeElement?.id

const getElementToFocus = (id: string) => {
    const element = document.getElementById(id)
    return element as IFocusableElement
}

const isDisabledOrNotExistElement = (id: string) => {
    if ((document.getElementById(id) as any)?.disabled === true || (document.getElementById(id) as any) === null) {
        return true
    }
    return false
}

const useStaticFocus = ({ focusOrderIds = [] }: IParams) => {
    const focusOrders = React.useRef<IFocusOrder[]>(focusOrderIds.map((id) => ({ id: id.toString(), focusable: true })))
    const activeIndex = React.useRef<number | null>(null)
    const behaviorMove = React.useRef(FocusDirection.none)

    const getFocusableIndex = (id: string | null) => focusOrders.current.findIndex((item) => item.id === id)

    const onFocus = (id: string) => {
        const element = getElementToFocus(id)

        if (!element) return

        if (element && !element.disabled) {
            element.focus()

            return
        }
    }

    const setActive = (id: string | null) => {
        const newActiveIndex = getFocusableIndex(id)
        if (newActiveIndex >= 0) {
            console.log('----setactive ', focusOrders.current[newActiveIndex])

            const prevActiveIndex = activeIndex.current
            activeIndex.current = newActiveIndex
            focusOrders.current[newActiveIndex].focusable = true
            if (_.isNumber(prevActiveIndex) && newActiveIndex !== prevActiveIndex) {
                return newActiveIndex - Number(prevActiveIndex) > 0 ? FocusDirection.next : FocusDirection.previous
            }
            return null
        }
        const isFocusing = focusOrders.current?.some((item) => item?.id && item?.id === (getActiveElement() || ''))

        if (!isFocusing) activeIndex.current = null

        return null
    }

    const onKeyDown = (e: any) => {
        behaviorMove.current = FocusDirection.none

        const handleMove = (direction: string) => {
            behaviorMove.current = direction

            e.preventDefault()
            e.stopPropagation()

            setTimeout(() => e.target.blur())
        }

        if ([eventKey.Tab, eventKey.Enter, eventKey.ArrowRight].some((is) => is(e))) handleMove(FocusDirection.next)
        if ([eventKey.ShiftTab, eventKey.ArrowLeft].some((is) => is(e))) handleMove(FocusDirection.previous)
    }

    const move = (step: number, currentId?: string) => {
        if (_.isNil(activeIndex.current)) return
        const currentIndex = _.isNil(currentId) ? activeIndex.current : getFocusableIndex(currentId)

        const toIndex = Number(currentIndex) + step
        const toId = focusOrders.current[toIndex]?.id

        if (toId) {
            if (isDisabledOrNotExistElement(toId)) {
                activeIndex.current = toIndex
                move(step)
                return
            }
            onFocus(toId)
        } else {
            // first item -> last item

            if (toIndex < 0) {
                const toIndex = focusOrders.current.length - 1
                if (isDisabledOrNotExistElement(focusOrders.current[toIndex]?.id)) {
                    activeIndex.current = toIndex
                    move(step)
                    return
                }

                onFocus(focusOrders.current[toIndex]!.id)
            }

            // last item -> first item

            if (toIndex >= focusOrders.current.length) {
                const toIndex = 0
                if (isDisabledOrNotExistElement(focusOrders.current[toIndex]?.id)) {
                    activeIndex.current = toIndex
                    move(step)
                    return
                }
                onFocus(focusOrders.current[toIndex]!.id)
            }
        }
    }

    const next = (currentId?: string) => {
        move(1, currentId)
    }
    const previous = (currentId?: string) => {
        move(-1, currentId)
    }
    const onBlur = () => setTimeout(() => setActive(null))

    const moveByKeyDown = () => {
        switch (behaviorMove.current) {
            case FocusDirection.next:
                next()
                break
            case FocusDirection.previous:
                previous()
                break
            default:
                onBlur()
                break
        }
        behaviorMove.current = FocusDirection.none
    }

    const forceMoveByKeyDown = (e: any) => {
        onKeyDown(e)
        moveByKeyDown()
    }

    return {
        onKeyDown,
        moveByKeyDown,
        move,
        onBlur,
        next,
        previous,
        setActive,
        forceMoveByKeyDown
    }
}

export default useStaticFocus
