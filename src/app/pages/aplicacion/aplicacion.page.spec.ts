import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { AplicacionPage } from './aplicacion.page';

describe('AplicacionPage', () => {
  let component: AplicacionPage;
  let fixture: ComponentFixture<AplicacionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AplicacionPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AplicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
