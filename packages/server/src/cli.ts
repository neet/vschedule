import { createConnection } from './db';
import { groups } from './utils/groups';
import { Team } from './entity/team';
import { Performer } from './entity/performer';

const main = async () => {
  const connection = await createConnection();

  for (const group of groups) {
    const team = new Team();

    try {
      team.id = group.id;
      team.name = group.name;
      team.members = await Promise.all(
        group.streamerIds.map(async id => {
          const performer = await connection
            .getRepository(Performer)
            .findOne({ id });
          if (!performer) throw new Error(`Invalid id ${id}`);
          return performer;
        }),
      );

      await connection.manager.save(team);

      // eslint-disable-next-line no-console
      console.log(`${group.name} has been saved`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error.toString());
      continue;
    }
  }

  process.exit(0);
};

main();
