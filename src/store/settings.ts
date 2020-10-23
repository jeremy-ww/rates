import { CURRENCIES } from '@/constants'

export const initialSettings = {
  source: 'EUR',
  period: 10,
  currencies: CURRENCIES
}

export default function settings(
  state = initialSettings,
  action: { type: 'ALTER'; state: Partial<typeof initialSettings> }
) {
  switch (action.type) {
    case 'ALTER':
      return { ...state, ...action.state }
    default:
      return state
  }
}

export type SettingsStore = typeof initialSettings
