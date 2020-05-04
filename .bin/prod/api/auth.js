'use strict';

module.exports = api => {
    api.get('/', (req, res) => {
        if (!req.session._id) return res.json({ err: true, status: Server.Msg.user.off });

        Server.DB.Users.findOne({ '_id': req.session._id }).select('profile').populate({ path: 'setting', select: 'theme' }).then(UserData => {
            if (!UserData) return res.json({ err: true, status: Server.Msg.database.get.null });

            res.json({ err: false, data: UserData });
        }, e => res.json({ err: true, status: Server.Msg.database.get.false }));
    });

    api.post('/login', (req, res) => {
        const { username, password } = req.body;
        if (req.session._id) return res.json({ err: true, status: Server.Msg.user.on });
        if (username == '' || password == '') return res.json({ err: true, status: 'Dữ liệu đầu vào không đủ' });

        Server.DB.Users.findOne({ 'auth.username': username }).select('auth ').then(UserData => {
            //Login False
            if (!UserData) return res.json({ err: true, status: 'Tài khoản này không tồn tại' });
            if (UserData.auth.password != password) return res.json({ err: true, status: 'Mật khẩu không chính xác' });

            //Login Done
            req.session._id = UserData._id;
            res.json({ err: false });
        }, e => res.json({ err: true, status: Server.Msg.database.get.false }));
    });

    api.post('/signup', (req, res) => {
        const { username, password, email } = req.body;
        if (req.session._id) return res.json({ err: true, status: Server.Msg.user.on });
        if (username == '' || password == '' || email == '') return res.json({ err: true, status: 'Dữ liệu đầu vào không đủ' });

        Server.DB.Users.findOne({ $or: [{ 'auth.username': username }, { 'profile.email': email }] }).select('auth').then(UserData => {
            //Reg False
            if (UserData) return res.json({ err: true, status: 'Tài khoản hoặc email đã tồn tại' });

            //Reg True
            let NewSetting = new Server.DB.Setting();
            let NewUser = new Server.DB.Users({
                auth: {
                    username: username,
                    password: password
                },
                profile: {
                    name: username,
                    email: email
                },
                setting: NewSetting._id
            });
            NewUser.profile.id = NewUser._id;
            NewSetting.of = NewUser._id;
            //Save
            NewSetting.save(err => {
                if (err) return res.json({ err: true, status: Server.Msg.database.save.false });
            });
            NewUser.save((err, User) => {
                if (err) return res.json({ err: true, status: Server.Msg.database.save.false });
                req.session._id = User._id;
                res.json({ err: false });
            });
        }, e => res.json({ err: true, status: Server.Msg.database.get.false }));
    });

    api.get('/logout', (req, res) => {
        if (!req.session._id) return res.json({ err: true, status: Server.Msg.user.off });
        req.session.destroy(err => {
            if (err) return res.json({ err: true, status: 'Chưa thể đăng xuất ở thời điểm hiện tại' });

            req.session = null;
            res.json({ err: false, status: 'Đăng xuất thành công' });
        });
    });
};
//# sourceMappingURL=auth.js.map