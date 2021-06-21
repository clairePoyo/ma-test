interface Message {
  body: string;
  contact: Contact;
  date: string;
  id: number;
  read: boolean;
  type: string;
  subject: string;
}

type MessagesRequestParameters = {
  sort?: "id:asc" | "id:desc" | "date:asc" | "date:desc";
  page?: number;
  page_size?: number;
  realtor_id: number;
};

type SingleMessageRequestParameters = {
  message_id: number;
  realtor_id: number;
};

type UpdateMessageBody = {
  body?: Message["body"];
  contact?: Message["contact"];
  date?: Message["date"];
  id?: Message["id"];
  read?: Message["read"];
  type?: Message["type"];
  subject?: Message["subject"];
};

interface MessagesPaginationMetadata {
  total: number;
  total_pages: number;
  first_page: number;
  last_page: number;
  page: number;
  previous_page: number;
  next_page: number;
}
