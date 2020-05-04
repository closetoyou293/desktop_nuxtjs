import MobileDetect from 'mobile-detect';

export default function (context) {
    const md = new MobileDetect(process.server ? context.req.headers['user-agent'] : navigator.userAgent);

    const Detect = {
        is_Mobile: md.mobile() == null ? false : true,
        is_Tablet: md.tablet() == null ? false : true,
        is_PC: md.mobile() || md.mobile() ? false : true
    }
    
    context.store.commit('detect/set_Detect', Detect);
}