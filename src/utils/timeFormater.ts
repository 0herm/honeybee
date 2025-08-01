import { timeFormatter as text } from '@text'

export function timeToString(minutes: number, format: 'long' | 'short' = 'short') {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60

    const hourString = hour > 0 ? `${hour}${format === 'long' ? ' ' + (hour > 1 ? text.hourLongPlural : text.hourLong) : text.hourShort}` : ''
    const minuteString = minute > 0 ? `${minute}${format === 'long' ? ' ' + (minute > 1 ? text.minuteLongPlural : text.minuteLong) : text.minuteShort}` : ''

    return `${hourString} ${minuteString}`
}