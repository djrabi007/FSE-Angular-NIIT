import {Reminder} from '../app/reminder'
import {Category} from '../app/category'
export class Note {
  noteId: number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteCreatedBy :string;
  reminder: Array<Reminder>;
  category : Category

  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteStatus = 'not-started';
  }
}
