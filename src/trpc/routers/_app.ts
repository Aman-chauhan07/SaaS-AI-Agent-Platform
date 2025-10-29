import { agentsRouter } from '@/app/module/agents/servers/procedures';
import { createTRPCRouter } from '../init';
import { meetingsRouter } from '@/app/module/meetings/server/procedures';

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings:meetingsRouter,
});
export type AppRouter = typeof appRouter;
