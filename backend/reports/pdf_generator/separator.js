exports.setSeparator = (separatorName, colspan, css_class) => {
    return `<tr class="${css_class}">
        <td center colspan=${colspan} style="text-align:center;">
            ${separatorName}
        </td>
    </tr>`
}