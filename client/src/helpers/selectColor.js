
let index = 0;
// randomized background colors for chart datasets
export default function selectColor() {
    // Spotify branding colors
    let colors = [
        "rgb(34,176,67)",
        "rgb(41,53,99)", 
        "rgb(213,116,159)",
        "rgb(108,154,243)",
        "rgb(207,239,185)",
        "rgb(121,30,53)",
        "rgb(183,241,226)",
        "rgb(224,99,49)",
        "rgb(242,232,54)",
        "rgb(56,101,82)",
        "rgb(56,0,244)",
        "rgb(241,203,209)"
    ];
    if (index === 0) {
        index++;
        return colors[0]
    } else if (index === colors.length) {
        // reset to 0
        index = 0;
        // return first item
        return colors[index];
    
    } else if (index > 0 && index < colors.length) {
        index++;
        return colors[index - 1];
    }  
};