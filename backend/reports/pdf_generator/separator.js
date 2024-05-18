exports.setSeparator = (separatorName, colspan) => {
    return `<tr class="separator">
        <td center colspan=${colspan} style="text-align:center;">
            ${separatorName}
        </td>
    </tr>`
}