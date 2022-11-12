export const header = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const TOKEN_NAME = "TokenMyCattleLog";
