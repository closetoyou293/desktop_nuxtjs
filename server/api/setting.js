module.exports = (api) => {
    api.post('/save/theme', (req, res) => {
        if(!req.session._id) return res.json({ err: true, status: Server.Msg.user.off });

        Server.DB.Setting
        .findOne({'of': req.session._id})
        .select('theme')
        .then(
            (Setting) => {
                if(!Setting) return res.json({err: true, status: Server.Msg.database.get.null});

                let newTheme = Object.assign(Setting.theme, req.body);
                Setting.save(err => {
                    if(err) return res.json({err: true, status: Server.Msg.database.save.false});
                    res.json({err: false});
                })
                
            },
            (e) => res.json({err: true, status: Server.Msg.database.get.false})
        );
    });
}