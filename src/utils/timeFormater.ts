import text from '@text'

export function timeToString(minutes: number, format: 'long' | 'short' = 'short') {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60

    const hourString = hour > 0 ? `${hour}${format === 'long' ? ' ' + (hour > 1 ? text.timeFormatter.hourLongPlural : text.timeFormatter.hourLong) : text.timeFormatter.hourShort}` : ''
    const minuteString = minute > 0 ? `${minute}${format === 'long' ? ' ' + (minute > 1 ? text.timeFormatter.minuteLongPlural : text.timeFormatter.minuteLong) : text.timeFormatter.minuteShort}` : ''

    return `${hourString} ${minuteString}`
}