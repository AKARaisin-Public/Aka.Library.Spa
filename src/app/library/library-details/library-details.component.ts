import { Library } from '../../shared/library';
import { Observable } from 'rxjs';
import { LibrariesService } from '../../services/libraries.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from './../../animations';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.scss'],
  animations: [slideInDownAnimation]
})
export class LibraryDetailsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'initial';

  library$: Observable<Library>;

  constructor(
    private route: ActivatedRoute,
    private libraries: LibrariesService
  ) {}

  ngOnInit() {
    this.library$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.libraries.getLibrary(+params.get('id'))
        ));
  }

}
