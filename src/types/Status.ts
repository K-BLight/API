/** The possible states to be in. */
export enum Status {
  Available = 'Available',
  Busy = 'Busy',
  Focused = 'Focused',
  Away = 'Away',
  Offline = 'Offline',
}

export type StatusDetails = {
  /** The identifier for the status. */
  id: string

  /** The label for the status. */
  label: string

  /** An optional emoji used to convey the status in Slack. */
  emoji?: string
}

export type StatusCollection = {
  [Status.Available]: StatusDetails
  [Status.Busy]: StatusDetails
  [Status.Focused]: StatusDetails
  [Status.Away]: StatusDetails
  [Status.Offline]: StatusDetails
}

export const StatusCollection: StatusCollection = {
  [Status.Available]: {
    id: 'available',
    label: 'Available',
  },
  [Status.Busy]: {
    id: 'busy',
    label: 'Busy',
    emoji: ':spiral_calendar_pad:',
  },
  [Status.Focused]: {
    id: 'focused',
    label: 'Focused',
  },
  [Status.Away]: {
    id: 'away',
    label: 'Away',
    emoji: ':lunch:',
  },
  [Status.Offline]: {
    id: 'offline',
    label: 'Offline',
  },
}
