import { formValidate } from '../src/client/js/formHandler';

describe("User input is a link", ()=> {
    test('Return false', ()=> {
        expect(formValidate('link')).toBe(false);
        expect(formValidate('htts')).toBe(false);
        expect(formValidate('tps//translate.yandex.ru/?lang=en-ru&text=User%20input%20is%20a%20link')).toBe(false);
    });
    
    test('Return True', ()=> {
        expect(formValidate('https://translate.yandex.ru/?lang=en-ru&text=User%20input%20is%20a%20link')).toBeTruthy();
        expect(formValidate('http://jestjs.io/docs/expect')).toBeTruthy();
    });
})

