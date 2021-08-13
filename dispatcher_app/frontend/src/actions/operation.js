export const setSend =  (
    {
        sendTeam = true,
        teamId = '',
        searchLat = '',
        searchLong = '',
        } = {}
) => ({
    type: 'SEND_TEAM',
    teamState : {
        sendTeam,
        teamId,
        searchLat,
        searchLong,
    }
});