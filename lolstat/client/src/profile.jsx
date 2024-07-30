import React, { useEffect, useState } from "react";


function Profile({playerData, rankData, matchData}) {
    const summonerLevel = playerData.summonerLevel;
    const summonerIconId = playerData.profileIconId;
    const summonerIcon = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/profileicon/${summonerIconId}.png`;
    const summonerRank = rankData?.tier || "";
    const summonerTier = rankData?.rank || "";
    
    console.log(summonerRank);
    const rankLogo = `./assets/Ranked Emblems Latest/Rank=${summonerRank.charAt(0).toUpperCase() + summonerRank.slice(1).toLowerCase()}.png`

    
    return (
        <div className="profile">
            {summonerLevel > 0 ? ( <p>Level: {summonerLevel}</p>) 
            : ( <p>Loading...</p> )}

            
            {summonerIconId != 0 ? 
                (<img width="100px" height="100px"src={summonerIcon}></img>)
                : (<p>No Icon Found...</p>)}
            
            <div>
            {summonerTier !== "" ? 
                (<div>
                    {summonerRank ? (
                        <div>
                            <p>{summonerRank} {summonerTier}</p>
                            {console.log(summonerRank.charAt(0).toUpperCase() + summonerRank.slice(1).toLowerCase())}
                            <img width="150px" height= "150px"src={`src/assets/Ranked Emblems Latest/Rank=${summonerRank.charAt(0).toUpperCase() + summonerRank.slice(1).toLowerCase()}.png`} alt="Rank Logo"/>
                        </div>
                    ) : (
                        <p>Loading rank data...</p>
                    )}
                </div>
                )
                : (<p>No Rank Found...</p>)}
            </div>

        </div>
    )
}

export default Profile;