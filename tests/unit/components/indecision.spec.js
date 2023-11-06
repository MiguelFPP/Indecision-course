import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision';
describe('Indecision component', () => {
    let wrapper;
    let log_spy;

    //mock fetch
    global.fetch = jest.fn(() => Promise.resolve({
        //json resolve en base a la respuesta de la api
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/15-3d723ea13af91839a671d4791fc53dcc.gif'
        })
    }));

    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        log_spy = jest.spyOn(console, 'log'); // llamado a un console.log

        //clear mocks
        jest.clearAllMocks();
    });

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('escribir en el inpur no debe disparar nada', async () => {
        const answerSpy = jest.spyOn(wrapper.vm, 'getAnswer');// llamar metodo del componente

        const input = wrapper.find('input');
        await input.setValue('Hola gente');

        //expect(log_spy).toHaveBeenCalled();
        expect(log_spy).toHaveBeenCalledTimes(1);
        expect(answerSpy).not.toHaveBeenCalled();
    });

    test('tipear el signo de ? dipara el fetch()', async () => {
        const answerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
        const input = wrapper.find('input')
        await input.setValue('nos vamos?')

        expect(answerSpy).toHaveBeenCalled();
    });

    test('pruebas en getAnswer()', async () => {
        await wrapper.vm.getAnswer(); //ejecutar el metodo

        const img = wrapper.find('img');

        expect(img.exists()).toBeTruthy();
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/15-3d723ea13af91839a671d4791fc53dcc.gif');
        expect(wrapper.vm.answer).toBe('Si');
    });

    test('pruebas en getAnswer - fallo en el api', async () => {
        fetch.mockImplementationOnce(()=>Promise.reject('Api is down'));//mock fetch error

        await wrapper.vm.getAnswer();//ejecutar el metodo

        const img = wrapper.find('img');
        
        expect(img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe('No se pudo cargar el api');
    })
});