export type MethodGrubResponse = {
  groubName: string;
  methods: MethodData[];
};

export type MethodData = {
  created_at: string;
  description: string;
  fee: number | null;
  id: number;
  image: string;
  min_amount: number;
  max_amount: number;
  name: string;
  updated_at: string;
};
