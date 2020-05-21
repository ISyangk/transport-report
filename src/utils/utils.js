export const changeantdSkin = (key) => {
    let styleLink = document.getElementById('theme-style');
    if (styleLink) { // 假如存在id为theme-style 的link标签，直接修改其href
        styleLink.href = `/theme/${key}.css`; // 切换 ant design 组件主题
    } else { // 不存在的话，则新建一个
        styleLink = document.createElement('link');
        styleLink.type = 'text/css';
        styleLink.rel = 'stylesheet';
        styleLink.id = 'theme-style';
        styleLink.href = `/theme/${key}.css`; // 切换 ant design 组件主题
        document.body.append(styleLink);
    }
    localStorage.setItem('localTheme', key);
};
