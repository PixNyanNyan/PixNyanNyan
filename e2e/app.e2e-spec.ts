import { PixNyanNyanPage } from './app.po';

describe('pix-nyan-nyan App', () => {
  let page: PixNyanNyanPage;

  beforeEach(() => {
    page = new PixNyanNyanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
