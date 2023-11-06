import { shallowMount, mount } from "@vue/test-utils"; // para montar los componentes
import Counter from "@/components/Counter";

describe('Counter component', () => {
    let wrapper;
    beforeEach(() => {
        return wrapper = shallowMount(Counter);
    });
    /* test('debe hacer match con el snapshot', () => {
        const wrapper = shallowMount(Counter);

        expect(wrapper.html()).toMatchSnapshot()
    }); */

    //evaluar el valor de las etiques
    test('Debe de tener el valor por defecto Counter', () => {

        const tag = wrapper.find('h2');

        expect(tag.exists()).toBeTruthy();
        expect(tag.text()).toBe('Counter');
    })

    test('El valor por defecto ser 100 el p', () => {

        const p_tags = wrapper.find('[data-testid="counter"]');

        expect(p_tags.exists()).toBeTruthy();
        expect(p_tags.text()).toBe('100');
    })

    test('Debe de incrementar y decrementar el valor de counter', async () => { //Hacer uso de async y await para usar evento en pruebas

        const button_tags = wrapper.findAll('button');

        expect(button_tags[0].exists()).toBeTruthy()
        await button_tags[0].trigger('click');

        let p_tags = wrapper.find('[data-testid="counter"]');
        expect(p_tags.text()).toBe('101');

        await button_tags[1].trigger('click');
        await button_tags[1].trigger('click');

        p_tags = wrapper.find('[data-testid="counter"]');
        expect(p_tags.text()).toBe('99');
    });

    test('debe ded establecer el valor por defecto', () => {
        const { start } = wrapper.props(); //definido de tipo Number

        const value = wrapper.find('[data-testid="counter"]').text();//llega como objeto string

        expect(Number(value)).toBe(start);
    })

    test('Debe de mostrar la prop title', () => {
        const title = 'Hola mundo';
        const start_number = 100;
        const wrapper = shallowMount(Counter, {
            props: {
                title,
                start: start_number
            }
        });

        expect(wrapper.find('h2').text()).toBe(title);

        expect(Number(wrapper.find('[data-testid="counter"]').text())).toBe(start_number);// type number
    });
})