
function getTimesstring(time){
    const hour = parseInt(time/3600);
    let remainingsecond = parseInt( time % 3600 )
    const munite = parseInt( remainingsecond / 60 );
    const second = remainingsecond % 60;
    return `${hour} hour ${munite} munite ${second} second ago`
}
console.log(getTimesstring(35020));
