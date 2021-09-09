export const downloadTeam =  (
    {
        teams,
        } = {}
) => ({
    type: 'DOWNLOAD_TEAMS',
    payload: teams
});
