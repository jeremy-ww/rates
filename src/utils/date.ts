import dayjs from 'dayjs'

export const DATE_FORMAT = 'YYYY-MM-DD'

export function getPast30Days () {
  const today = dayjs()
  return {
    start_at: today.subtract(30, 'day').format(DATE_FORMAT),
    end_at: today.format(DATE_FORMAT)
  }
}
