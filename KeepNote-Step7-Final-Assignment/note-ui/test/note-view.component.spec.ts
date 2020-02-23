import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NoteCardViewComponent } from '../src/app/note-card-view/note-card-view.component';
import { NotesService } from '../src/app/services/notes.service';
import { AuthenticationService } from '../src/app/services/authentication.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const testConfig = {
  getNotes: {
    positive: [{
      noteId: 2,
      noteTitle: 'Read Angular 5 blog again',
      noteContent: 'Shall do at 9 pm',
      noteStatus: 'not-started',
      noteCreatedBy :null,
      reminder: null,
      category : null
    },
    {
      noteId: 1,
      noteTitle: 'Read Angular 5 blog again',
      noteContent: 'Shall do at 8 pm',
      noteStatus: 'not-started',
      noteCreatedBy :null,
      reminder: null,
      category : null
    }],
    negative: []
  }
};

describe('NoteViewComponent', () => {
  let noteViewComponent: NoteCardViewComponent;
  let fixture: ComponentFixture<NoteCardViewComponent>;
  let notesService: NotesService;
  let spyGetNotes: any;
  let positiveResponse: Array<any>;
  let negativeResponse: Array<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCardViewComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientModule ],
      providers: [ NotesService, AuthenticationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCardViewComponent);
    noteViewComponent = fixture.componentInstance;
    notesService = fixture.debugElement.injector.get(NotesService);
  });

  it('should create', () => {
    expect(noteViewComponent).toBeTruthy();
  });


  it('should handle get all notes', fakeAsync(() => {
    positiveResponse = testConfig.getNotes.positive;
    spyGetNotes = spyOn(notesService, 'getNotes').and.returnValue(Observable.of(positiveResponse));
    fixture.detectChanges();
    expect(noteViewComponent.notes).toBe(positiveResponse, `should get all notes from back end`);
  }));

  it('should handle if no note is created by user', fakeAsync(() => {
    negativeResponse = testConfig.getNotes.negative;
    spyGetNotes = spyOn(notesService, 'getNotes').and.returnValue(Observable.of(negativeResponse));
    fixture.detectChanges();
    expect(noteViewComponent.notes.length).toBe(0,
      `If there is no 'note' created, notes array length should be 0`);
  }));
});
