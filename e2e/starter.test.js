describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('homeView'))).toBeVisible();
    await waitFor(element(by.id('Message'))).toHaveText('Hello Detox').withTimeout(10000);
    await expect(element(by.id('Message'))).toHaveText('Hello Detox');
  });

});
