import { createPinia, setActivePinia } from 'pinia';
import { appStore } from './../../../store/app.js';

describe('appStore', () => {
    let pinia;

    beforeEach(() => {
        // Create a fresh Pinia instance for each test
        pinia = createPinia();
        setActivePinia(pinia);
    });

    it('has preloader set to false by default', () => {
        // Create a store instance
        const store = appStore();
        // Assert that the preloader is false initially
        expect(store.preloader).toBe(false);
    });

    it('sets preloader to true when called', () => {
        // Create a store instance
        const store = appStore();

        // Call the action to set preloader to true
        store.preloader = true;

        // Assert that the preloader is now true
        expect(store.preloader).toBe(true);
    });
});
