export const downloadTeam =  (
    {
        id = 'default',
        lat = '',
        long ='',
        } = {}
) => ({
    type: 'DOWNLOAD_TEAMS',
    teams : {
        id,
        lat,
        long
    }
});
