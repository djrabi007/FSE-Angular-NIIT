import {Component, Inject,Input} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
isNoteView: any = true;
isHidden: any = false;
  constructor(private location: Location, private router: Router, private routerService: RouterService) {
    router.events.subscribe((val) => {
      if(location.path().indexOf('note')> -1){
        this.isHidden = true;
      }else{
        this.isHidden = false;
      }
      if (location.path().indexOf('listview') > -1) {
        this.isNoteView = false;
      }
    });
  }

  switchView() {
    if (this.isNoteView) {
      this.routerService.routeToNoteListView();
      this.isNoteView = false;
    } else {
      this.routerService.routeToNoteCardView();
      this.isNoteView = true;
    }
  }

}
