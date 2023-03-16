export type ProfileType = {
  id: number;
  user_id: string;
  user_img: string;
  major: string;
  year: string;
  status: [
    {
      date: string;
      type: number;
    }
  ];
};
