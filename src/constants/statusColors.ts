export const STATUS_COLORS = {
  New: {
    color: '#026AA2',
    bgColor: '#E0F2FE',
  },
  Forms: {
    color: '#7A5AF8',
    bgColor: '#F4F3FF',
  },
  Pay: {
    color: '#B54708',
    bgColor: '#FEF6EE',
  },
  Exam: {
    color: '#008D3E',
    bgColor: '#E2FFE9',
  },
  Military: {
    color: '#475467',
    bgColor: '#F2F4F7',
  },
} as const;

export type StatusColorKey = keyof typeof STATUS_COLORS; 