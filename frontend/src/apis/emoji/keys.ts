export const emojiKeys = {
  all: ['emoji'] as const,
  list: () => [...emojiKeys.all, 'list'] as const,
}
