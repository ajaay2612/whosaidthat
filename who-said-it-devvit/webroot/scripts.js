{
    __sveltekit_1b2pily = {
        base: new URL(".", location).pathname.slice(0, -1)
    };

    const element = document.currentScript.parentElement;

    const data = [null,null];

    Promise.all([
        import("./_app/immutable/entry/start.CgowV2PD.js"),
        import("./_app/immutable/entry/app.poaWLUzE.js")
    ]).then(([kit, app]) => {
        kit.start(app, element, {
            node_ids: [0, 2],
            data,
            form: null,
            error: null
        });
    });
}