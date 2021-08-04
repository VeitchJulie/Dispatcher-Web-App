export const setSend =  (
    {
        sendTeam = true,
        teamId = '',
        } = {}
) => ({
    type: 'SEND_TEAM',
    teamState : {
        sendTeam,
        teamId,
    }
});