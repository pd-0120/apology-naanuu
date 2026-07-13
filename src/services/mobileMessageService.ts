// services/mobileMessageService.ts
import axios, { AxiosError } from 'axios';

// Configuration
const API_BASE_URL = 'https://api.mobilemessage.com.au/v1';
const API_USERNAME = process.env.REACT_APP_MM_USERNAME || '';
const API_PASSWORD = process.env.REACT_APP_MM_PASSWORD || '';

// Types based on API documentation
export interface Message {
  to: string;
  message: string;
  sender: string;
  custom_ref?: string;
  unicode?: boolean;
}

export interface SendMessageRequest {
  messages: Message[];
  enable_unicode?: boolean;
  max_parts?: number;
  ignore_unsubscribes?: boolean;
}

export interface SendMessageResponse {
  status: string;
  send_id: number;
  ignore_unsubscribes: boolean;
  total_cost: number;
  results: {
    to: string;
    message: string;
    sender: string;
    custom_ref?: string;
    status: string;
    cost: number;
    message_id: string;
    encoding?: string;
  }[];
}

export interface MessageHistoryResponse {
  status: string;
  total?: number;
  limit?: number;
  offset?: number;
  results: {
    message_id: string;
    recipient_number: string;
    sender_id: string;
    message_content: string;
    status: string;
    cost: number;
    custom_ref?: string;
    requested_at: string;
    scheduled_for: string | null;
    send_id: number;
  }[];
}

export interface Contact {
  contact_id?: number;
  number: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  other?: string;
  field_1?: string;
  field_2?: string;
  field_3?: string;
  field_4?: string;
  field_5?: string;
}

export interface List {
  list_id: number;
  name: string;
  created_at: string;
  contact_count: number;
}

class MobileMessageService {
  private username: string;
  private password: string;
  private baseUrl: string;

  constructor() {
    this.username = API_USERNAME;
    this.password = API_PASSWORD;
    this.baseUrl = API_BASE_URL;
  }

  private getAuthHeader(): string {
    const credentials = `${this.username}:${this.password}`;
    return `Basic ${btoa(credentials)}`;
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<T> {
    try {
      const config = {
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        data,
      };

      const response = await axios.request<T>(config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle API error responses
        console.error('API Error:', axiosError.response.data);
        throw new Error(
          (axiosError.response.data as any)?.message || 
          `Request failed with status ${axiosError.response.status}`
        );
      }
      throw error;
    }
  }

  // === SMS ENDPOINTS ===

  /**
   * Send one or more SMS messages
   */
  async sendMessages(request: SendMessageRequest): Promise<SendMessageResponse> {
    return this.request<SendMessageResponse>('POST', '/messages', request);
  }

  /**
   * Send a single SMS message (convenience method)
   */
  async sendSingleMessage(
    to: string,
    message: string,
    sender: string,
    customRef?: string,
    unicode?: boolean
  ): Promise<SendMessageResponse> {
    return this.sendMessages({
      messages: [{ to, message, sender, custom_ref: customRef, unicode }],
    });
  }

  /**
   * Send to a contact list
   */
  async sendToList(data: {
    list_id: number;
    sender: string;
    message: string;
    enable_unicode?: boolean;
    max_parts?: number;
    custom_ref?: string;
    ignore_unsubscribes?: boolean;
    scheduled_for?: string;
    stagger_minutes?: number;
  }): Promise<any> {
    return this.request('POST', '/list-send', data);
  }

  /**
   * Get message history
   */
  async getMessages(params?: {
    message_id?: string;
    custom_ref?: string;
    status?: 'pending' | 'scheduled' | 'sent' | 'delivered' | 'failed' | 'cancelled';
    from?: string;
    to?: string;
    limit?: number;
    offset?: number;
  }): Promise<MessageHistoryResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    const queryString = queryParams.toString();
    const endpoint = `/messages${queryString ? `?${queryString}` : ''}`;
    return this.request<MessageHistoryResponse>('GET', endpoint);
  }

  /**
   * Cancel scheduled message(s)
   */
  async cancelMessages(data: {
    message_id?: string;
    custom_ref?: string;
    send_id?: number;
  }): Promise<any> {
    return this.request('DELETE', '/messages', data);
  }

  // === CONTACT ENDPOINTS ===

  /**
   * List contacts
   */
  async getContacts(params?: {
    number?: string;
    first_name?: string;
    last_name?: string;
    company?: string;
    other?: string;
    field_1?: string;
    field_2?: string;
    field_3?: string;
    field_4?: string;
    field_5?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ status: string; total: number; limit: number; offset: number; results: Contact[] }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    const queryString = queryParams.toString();
    return this.request('GET', `/contacts${queryString ? `?${queryString}` : ''}`);
  }

  /**
   * Create a new contact
   */
  async createContact(contact: Contact): Promise<{ status: string; contact_id: number; number: string }> {
    return this.request('POST', '/contacts', contact);
  }

  /**
   * Update a contact
   */
  async updateContact(contact: Partial<Contact> & { contact_id: number }): Promise<{ status: string; contact_id: number }> {
    return this.request('PATCH', '/contacts', contact);
  }

  /**
   * Delete a contact
   */
  async deleteContact(contactId: number): Promise<{ status: string; contact_id: number; removed: boolean }> {
    return this.request('DELETE', '/contacts', { contact_id: contactId });
  }

  // === LIST ENDPOINTS ===

  /**
   * Get all contact lists
   */
  async getLists(): Promise<{ status: string; results: List[] }> {
    return this.request('GET', '/lists');
  }

  /**
   * Create a new list
   */
  async createList(name: string): Promise<{ status: string; list_id: number; name: string }> {
    return this.request('POST', '/lists', { name });
  }

  /**
   * Rename a list
   */
  async renameList(listId: number, name: string): Promise<{ status: string; list_id: number; name: string }> {
    return this.request('PATCH', '/lists', { list_id: listId, name });
  }

  /**
   * Delete a list
   */
  async deleteList(listId: number, deleteContacts: boolean = false): Promise<any> {
    return this.request('DELETE', '/lists', { list_id: listId, delete_contacts: deleteContacts });
  }

  // === LIST MEMBERS ENDPOINTS ===

  /**
   * Get contacts in a list
   */
  async getListContacts(listId: number, limit?: number, offset?: number): Promise<any> {
    const queryParams = new URLSearchParams({ list_id: String(listId) });
    if (limit !== undefined) queryParams.append('limit', String(limit));
    if (offset !== undefined) queryParams.append('offset', String(offset));
    return this.request('GET', `/list-contacts?${queryParams}`);
  }

  /**
   * Add a contact to a list
   */
  async addContactToList(listId: number, contactId: number): Promise<any> {
    return this.request('POST', '/list-contacts', { list_id: listId, contact_id: contactId });
  }

  /**
   * Remove a contact from a list
   */
  async removeContactFromList(listId: number, contactId: number): Promise<any> {
    return this.request('DELETE', '/list-contacts', { list_id: listId, contact_id: contactId });
  }

  // === UNSUBSCRIBE ENDPOINTS ===

  /**
   * Get unsubscribe list
   */
  async getUnsubscribes(params?: { number?: string; limit?: number; offset?: number }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    const queryString = queryParams.toString();
    return this.request('GET', `/unsubscribes${queryString ? `?${queryString}` : ''}`);
  }
}

export default new MobileMessageService();