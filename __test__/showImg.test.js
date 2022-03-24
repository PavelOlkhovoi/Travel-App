import { showImg } from '../src/client/js/tests/showImg';

test('Respond with foto', () => {
    expect(showImg(`https://pixabay.com/photos/palace-london-parliament-big-ben-530055`)).toEqual(true);
})

test('Respond without foto', () => {
    expect(showImg(undefined)).toEqual(false);
    expect(showImg(null)).toEqual(false);
})