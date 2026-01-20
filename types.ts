
export interface UserProfile {
  uid: string;
  displayName: string;
  bio: string;
  emoji: string;
  userId: string; // va-xxxx
  dpUrl: string;
  status: 'online' | 'offline';
  lastChanged: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  type: 'text' | 'image' | 'video' | 'audio' | 'location';
  reactions?: Record<string, string>;
  isEdited?: boolean;
  replyTo?: string;
}

export interface Contact {
  uid: string;
  displayName: string;
  dpUrl: string;
  lastMessage?: string;
  unreadCount?: number;
  status: 'online' | 'offline';
}

export interface FriendRequest {
  id: string;
  fromUid: string;
  fromDisplayName: string;
  fromDpUrl: string;
  timestamp: number;
}

export interface CallSession {
  id: string;
  caller: string;
  callee: string;
  type: 'voice' | 'video';
  status: 'offering' | 'ringing' | 'connected' | 'ended';
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
}
