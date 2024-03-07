import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Login from './../../../components/Login.vue'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Login page', () => {
    const wrapper = mount(Login, {
        props: {},
        global: {
            components: {
                Login,
            },
            plugins: [vuetify],
        }
    })

    it('should display login form', () => {


        // Assert the rendered text of the component
        expect(wrapper.text()).toContain('Login form')
    });

    it('toggles between login and register forms', async () => {
        const toggleButton = wrapper.find('.grey--text');

        // Initially, it should display the login form
        expect(wrapper.text()).toContain('Login form');

        // Clicking on the toggle button should switch to the register form
        await toggleButton.trigger('click');
        expect(wrapper.text()).toContain('Register form');

        // Clicking on the toggle button again should switch back to the login form
        await toggleButton.trigger('click');
        expect(wrapper.text()).toContain('Login form');
    });

})


