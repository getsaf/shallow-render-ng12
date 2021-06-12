import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import {AppModule} from './app.module';

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;
  beforeEach(async () => {
    shallow = new Shallow(AppComponent, AppModule);
  });

  it('should create the app', async () => {
    const wrapper = await shallow.render();
    expect(wrapper.find('#rocket')).toHaveFound(1);
  });
});
