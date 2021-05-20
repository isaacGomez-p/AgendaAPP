import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { SiembraPage } from './siembra.page';

describe('Tab1Page', () => {
  let component: SiembraPage;
  let fixture: ComponentFixture<SiembraPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SiembraPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SiembraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
