import Light from '~/theme/light';
import Dark from '~/theme/dark';
import ColorMain from '~/theme/color';

export default {
    theme: {
        dark: true,
        options: {
            customProperties: true,
        },
        themes: {
            dark: Dark(ColorMain),
            light: Light(ColorMain)
        }
    },
}