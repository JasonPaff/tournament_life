import { prisma, stytchClient } from '../server/config';
import { Role, VenueType } from '@prisma/client';
import { handleError } from '../server/utils';

import type { CreateResponse } from 'stytch/types/lib/users';
import type { User } from '@prisma/client';

const stytch = require('stytch');

const main = async () => {
    try {
        const user = await seedUser();
        if (!user) return;
        await seedVenues(user.id);
        await seedGameTypes(user.id);
        await seedGameFormats(user.id);
        await prisma.$disconnect();
    } catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
};

const seedUser = async (): Promise<User | null> => {
    const user = {
        email: process.env.ADMIN_EMAIL ?? '',
        stytchId: '',
    };

    // TODO: Check for existing test user on stytch.
    const stytchUsers = await stytchClient.users.search({
        query: {
            operator: stytch.UserSearchOperator.AND,
            operands: [{ filter_name: 'email_address', filter_value: [user.email] }],
        },
    });

    // * no stytch user found.
    if (stytchUsers.results.length === 0) {
        // create a test user on stytch.
        const stytchTestUser: CreateResponse = await stytchClient.passwords.create({
            email: user.email,
            password: process.env.ADMIN_PASSWORD,
        });

        // TODO: Handle stytch errors.
        if (!stytchTestUser.user) return null;

        user.email = stytchTestUser.user.emails[0].email;
        user.stytchId = stytchTestUser.user_id;
    }
    // * stytch user found.
    else {
        console.log(stytchUsers.results);
        user.email = stytchUsers.results[0].emails[0].email;
        user.stytchId = stytchUsers.results[0].user_id;
    }

    // * create a test user in the database.
    const admin = await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL },
        create: {
            displayName: Role.ADMIN,
            email: user.email,
            firstName: process.env.ADMIN_FIRST_NAME,
            lastName: process.env.ADMIN_LAST_NAME,
            role: Role.ADMIN,
            stytchUserId: user.stytchId,
        },
        update: {
            displayName: Role.ADMIN,
            email: user.email,
            firstName: process.env.ADMIN_FIRST_NAME,
            lastName: process.env.ADMIN_LAST_NAME,
            role: Role.ADMIN,
            stytchUserId: user.stytchId,
        },
    });
    if (!admin) return null;

    // TODO: Rollback Stytch user if database user creation fails.

    console.log('admin seeded', admin);
    return admin;
};

const seedVenues = async (userId: string) => {
    const harrahsSeedData = {
        createdBy: userId,
        name: "harrah's cherokee casino resort",
        type: VenueType.Physical,
    };
    const globalPokerSeedData = {
        createdBy: userId,
        name: 'global poker',
        type: VenueType.Virtual,
    };
    prisma.venue.upsert({
        create: { ...harrahsSeedData },
        update: { ...harrahsSeedData },
        where: {
            createdBy_name: { createdBy: userId, name: harrahsSeedData.name },
        },
    });
    const existingHarrahsSeed = await prisma.venue.findFirst({
        where: harrahsSeedData,
    });
    const existingGlobalPokerSeed = await prisma.venue.findFirst({
        where: globalPokerSeedData,
    });

    existingHarrahsSeed
        ? await prisma.venue
              .update({
                  where: { id: existingHarrahsSeed.id },
                  data: harrahsSeedData,
              })
              .catch(handleError)
              .then((venue) => console.log(`venue ${venue.name} updated`, venue))
        : await prisma.venue
              .create({
                  data: harrahsSeedData,
              })
              .catch(handleError)
              .then((venue) => console.log(`venue ${venue.name} created`, venue));

    existingGlobalPokerSeed
        ? await prisma.venue
              .update({
                  where: { id: existingGlobalPokerSeed.id },
                  data: globalPokerSeedData,
              })
              .catch(handleError)
              .then((venue) => console.log(`venue ${venue.name} updated`, venue))
        : await prisma.venue
              .create({
                  data: globalPokerSeedData,
              })
              .catch(handleError)
              .then((venue) => console.log(`venue ${venue.name} created`, venue));
};

const seedGameTypes = async (userId: string) => {
    const nlheSeedData = { createdBy: userId, name: "no-limit hold'em" };
    const ploSeedData = { createdBy: userId, name: 'pot-limit omaha' };

    const existingNlheSeed = await prisma.gameType.findFirst({
        where: nlheSeedData,
    });
    const existingPloSeed = await prisma.gameType.findFirst({
        where: ploSeedData,
    });

    existingNlheSeed
        ? await prisma.gameType
              .update({
                  where: { id: existingNlheSeed.id },
                  data: nlheSeedData,
              })
              .catch(handleError)
              .then((gameType) => console.log(`game type ${gameType.name} updated`, gameType))
        : await prisma.gameType
              .create({
                  data: nlheSeedData,
              })
              .catch(handleError)
              .then((gameType) => console.log(`game type ${gameType.name} created`, gameType));

    existingPloSeed
        ? await prisma.gameType
              .update({
                  where: { id: existingPloSeed.id },
                  data: ploSeedData,
              })
              .catch(handleError)
              .then((gameType) => console.log(`game type ${gameType.name} updated`, gameType))
        : await prisma.gameType
              .create({
                  data: ploSeedData,
              })
              .catch(handleError)
              .then((gameType) => console.log(`game type ${gameType.name} created`, gameType));
};

const seedGameFormats = async (userId: string) => {
    const freezeoutSeedData = { createdBy: userId, name: 'freezeout' };
    const rebuySeedData = { createdBy: userId, name: 'rebuy' };

    const existingFreezeoutSeed = await prisma.gameFormat.findFirst({
        where: freezeoutSeedData,
    });
    const existingRebuySeed = await prisma.gameFormat.findFirst({
        where: rebuySeedData,
    });

    existingFreezeoutSeed
        ? await prisma.gameFormat
              .update({
                  where: { id: existingFreezeoutSeed.id },
                  data: freezeoutSeedData,
              })
              .catch(handleError)
              .then((gameFormat) => console.log(`game format ${gameFormat.name} updated`, gameFormat))
        : await prisma.gameFormat
              .create({
                  data: freezeoutSeedData,
              })
              .catch(handleError)
              .then((gameFormat) => console.log(`game format ${gameFormat.name} created`, gameFormat));

    existingRebuySeed
        ? await prisma.gameFormat
              .update({
                  where: { id: existingRebuySeed.id },
                  data: rebuySeedData,
              })
              .catch(handleError)
              .then((gameFormat) => console.log(`game format ${gameFormat.name} updated`, gameFormat))
        : await prisma.gameFormat
              .create({
                  data: rebuySeedData,
              })
              .catch(handleError)
              .then((gameFormat) => console.log(`game format ${gameFormat.name} created`, gameFormat));
};

main().then();
