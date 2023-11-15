export interface SlackEventEnvelope {
  type: string
  challenge?: string
  token?: string
  team_id?: string
  api_app_id?: string
  event: Event
  event_id?: string
  event_time?: number
  authorizations?: Authorization[]
  is_ext_shared_channel?: boolean
}

export interface StatusChangedEvent {
  token?: string
  team_id?: string
  api_app_id?: string
  event?: Event
  type?: string
  event_id?: string
  event_time?: number
  authorizations?: Authorization[]
  is_ext_shared_channel?: boolean
}

export interface Authorization {
  enterprise_id: null
  team_id: string
  user_id: string
  is_bot: boolean
  is_enterprise_install: boolean
}

export interface Event {
  user: User
  cache_ts: number
  type: string
  event_ts: string
}

export interface User {
  id: string
  team_id: string
  name: string
  deleted: boolean
  color: string
  real_name: string
  tz: string
  tz_label: string
  tz_offset: number
  profile: Profile
  is_admin: boolean
  is_owner: boolean
  is_primary_owner: boolean
  is_restricted: boolean
  is_ultra_restricted: boolean
  is_bot: boolean
  is_app_user: boolean
  updated: number
  is_email_confirmed: boolean
  who_can_share_contact_card: string
  locale: string
}

export interface Profile {
  title: string
  phone: string
  skype: string
  real_name: string
  real_name_normalized: string
  display_name: string
  display_name_normalized: string
  fields: { [key: string]: Field }
  status_text: string
  status_emoji: string
  status_emoji_display_info: StatusEmojiDisplayInfo[]
  status_expiration: number
  avatar_hash: string
  guest_invited_by: string
  image_original: string
  is_custom_image: boolean
  pronouns: string
  huddle_state: string
  huddle_state_expiration_ts: number
  first_name: string
  last_name: string
  image_24: string
  image_32: string
  image_48: string
  image_72: string
  image_192: string
  image_512: string
  image_1024: string
  status_text_canonical: string
  team: string
}

export interface Field {
  value: string
  alt: string
}

export interface StatusEmojiDisplayInfo {
  emoji_name: string
  display_url: string
  unicode: string
}

export interface StatusInfo {
  status_emoji: string
  status_text: string
}
