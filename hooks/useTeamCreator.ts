import { SpeciesData } from "@/data/global-types";
import { useCallback, useEffect, useState } from "react";

const MAX_TEAM_MEMBERS = 6;

const useTeamCreator = () => {
  const [team, setTeam] = useState<SpeciesData[]>([]);
  const [error, setError] = useState<string>();
  const [canAddToTeam, setCanAddToTeam] = useState(true);

  const addToTeam = useCallback(
    (pokemon: SpeciesData) => {
      if (canAddToTeam) {
        console.log("...Adding");
        setTeam([...team, pokemon]);
      } else {
        setError("Team is full. Can't add anymore pokemons.");
      }
    },
    [team, canAddToTeam]
  );

  useEffect(() => {
    if (team.length >= MAX_TEAM_MEMBERS) {
      setCanAddToTeam(false);
    }
  }, [team.length]);

  return {
    team,
    addToTeam,
    canAddToTeam,
    error,
  };
};

export default useTeamCreator;
