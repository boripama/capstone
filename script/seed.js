/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User } = require('../server/db/models');
const { Activity } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);


  const activities = await Promise.all([
    Activity.create(
      {
        title: 'CRAAAZY run',
        distance: 423.123,
        polyline: 'vlxuOcyr~FGAcAZm@Pm@Zg@\]^Mh@e@Vi@R]\Wd@Mb@Id@If@U^s@@q@Cy@C_@CYAI?u@@IBKFEd@Ah@?d@Ab@Ah@Af@Ch@Eh@Ah@?f@Gb@Cf@Ah@?d@@f@?d@Ad@Bb@@f@Ah@?f@?b@Cd@Ad@Ab@?h@Cb@Bf@Ad@Bb@@j@?f@Cj@Af@Ab@@h@Ah@?d@Ef@Af@@j@Ab@?d@?b@?f@?d@?f@Af@Kh@U`@Yb@Mf@Y^o@Rw@Fw@@o@Dg@PEf@?d@Eh@Kf@Eh@Cd@a@^a@ZWd@Qf@Ih@Cd@Sd@_@\q@HEA]??d@N`@Hj@Db@@d@Bb@Hd@Dj@Df@Ih@Ch@Fb@Cf@Sd@Od@@b@Ed@Mf@O`@Lf@If@Qb@@b@Af@Eb@?b@Bh@Ah@Cd@Eb@@h@Dd@?h@Gd@If@Af@Jf@Lh@Jf@Jf@@b@If@Qb@Md@Qd@_@\Y`@S`@_@\i@Vk@Vk@Xi@Za@\U`@Qd@Kb@Kb@Mf@Mh@Mh@Id@Gf@Md@Md@Oh@Q`@Uf@Ih@CFNMPa@Rg@La@Pg@Ng@Ni@Li@Lg@Fc@Hg@Fc@Jc@Hg@Lc@\_@f@Wh@[d@Uf@Wb@_@\]Ve@Va@^[Pe@Jg@Lc@Jc@@i@Ii@Mg@Ic@Mi@Ai@Li@Ha@@g@?e@Ce@?i@Dg@Bi@?e@Cg@Fg@@e@Ei@Pg@?g@Ai@Ve@Lg@Cg@Dk@Ra@Ji@Cc@Ec@Di@Ai@Ii@Gg@Gi@Ai@Ac@Ge@Sa@Ce@@k@Me@c@[m@Ue@YOc@Gc@[a@?EXg@Jc@?g@a@a@Sa@Gg@De@Pe@Ve@f@[n@Qr@Ir@An@Fr@Br@Fl@Nd@Vl@Jt@?r@Bt@Ml@Of@Uh@]Xa@Re@Hc@?e@?e@?i@@g@?i@?e@?c@@g@?i@?g@@g@Bi@?e@?i@@i@@i@@g@?g@?c@@g@@k@@c@?c@@i@Be@Bg@?c@@e@Bk@?e@Ak@?[@SBi@@e@@g@?c@?i@@e@?i@?e@?g@?i@?g@@e@Ac@@g@@g@?g@@e@@g@Ag@@i@Ac@@i@@g@Be@@g@?g@?g@@e@Ee@Cc@Ig@Qe@W_@]c@]c@c@_@i@[q@Su@Iw@Go@Aw@Aw@Es@Kq@Qq@Qi@Uc@Wa@_@Sc@Ge@Ae@Ce@Cg@@e@Fi@Pe@Dg@Fg@Bi@@g@EMm@Mc@K?e@@g@?i@Bg@?g@Bg@d@]Pe@^[b@[p@Mv@?r@Gv@Bn@Jv@?t@Cn@?t@@r@?t@@n@?r@?t@Al@Ap@It@Av@Cr@Fv@Gt@Ix@Kt@Ep@Ix@Kl@Mp@Av@Ar@Bl@Lr@Bt@Kt@Bt@Kr@At@Bn@Hx@Ax@?r@Ad@\dAg@l@@Kn@m@m@XYv@Dp@Tn@Rv@Dz@Ll@Vt@V`@^fALd@Fh@FRFJ?p@Hn@?FCr@Dr@@t@?n@XDANGt@?p@Cl@Kl@Yr@ANA^In@GRXFHx@Fp@Tx@Zv@TLDHEp@C`@c@VD@Dp@Fp@Bt@BJAB_@j@K`@\F?v@Kf@i@r@Ap@Nn@Gl@?FXNh@^`@b@X`@Z^`@\`@`@b@Zb@`@NCCIEJq@@GEOWe@_@[s@Km@Sg@Yg@][QCKq@I}@d@q@]q@Ii@_@c@k@i@Wm@DAFE@m@Gy@Bw@MQg@CUQk@[c@w@?W@k@]wAvBk@b@m@Za@bAKHSRj@IDDRXv@q@t@h@d@p@l@Zh@Nn@Ff@sAPm@FCv@Pp@Ml@[VQ@Ux@Gr@Rt@It@An@Jp@QFF@~Ct@G^qAl@GJn@h@fBzAoDl@P?DIn@?Ek@_@Es@@w@Ke@Mm@Qg@Ym@mAX]NUPy@bCSFjARd@YRt@Op@_@`@kAHgAB[A',
        startTime: Date.now(),
        endTime: Date.now() + 1000
      }
    ),
    Activity.create(
      {
        title: 'sort of crazy run',
        distance: 222.222,
        polyline: 'vlxuOcyr~FGAcAZm@Pm@Zg@\]^Mh@e@Vi@R]\Wd@Mb@Id@If@U^s@@q@Cy@C_@CYAI?u@@IBKFEd@Ah@?d@Ab@Ah@Af@Ch@Eh@Ah@?f@Gb@Cf@Ah@?d@@f@?d@Ad@Bb@@f@Ah@?f@?b@Cd@Ad@Ab@?h@Cb@Bf@Ad@Bb@@j@?f@Cj@Af@Ab@@h@Ah@?d@Ef@Af@@j@Ab@?d@?b@?f@?d@?f@Af@Kh@U`@Yb@Mf@Y^o@Rw@Fw@@o@Dg@PEf@?d@Eh@Kf@Eh@Cd@a@^a@ZWd@Qf@Ih@Cd@Sd@_@\q@HEA]??d@N`@Hj@Db@@d@Bb@Hd@Dj@Df@Ih@Ch@Fb@Cf@Sd@Od@@b@Ed@Mf@O`@Lf@If@Qb@@b@Af@Eb@?b@Bh@Ah@Cd@Eb@@h@Dd@?h@Gd@If@Af@Jf@Lh@Jf@Jf@@b@If@Qb@Md@Qd@_@\Y`@S`@_@\i@Vk@Vk@Xi@Za@\U`@Qd@Kb@Kb@Mf@Mh@Mh@Id@Gf@Md@Md@Oh@Q`@Uf@Ih@CFNMPa@Rg@La@Pg@Ng@Ni@Li@Lg@Fc@Hg@Fc@Jc@Hg@Lc@\_@f@Wh@[d@Uf@Wb@_@\]Ve@Va@^[Pe@Jg@Lc@Jc@@i@Ii@Mg@Ic@Mi@Ai@Li@Ha@@g@?e@Ce@?i@Dg@Bi@?e@Cg@Fg@@e@Ei@Pg@?g@Ai@Ve@Lg@Cg@Dk@Ra@Ji@Cc@Ec@Di@Ai@Ii@Gg@Gi@Ai@Ac@Ge@Sa@Ce@@k@Me@c@[m@Ue@YOc@Gc@[a@?EXg@Jc@?g@a@a@Sa@Gg@De@Pe@Ve@f@[n@Qr@Ir@An@Fr@Br@Fl@Nd@Vl@Jt@?r@Bt@Ml@Of@Uh@]Xa@Re@Hc@?e@?e@?i@@g@?i@?e@?c@@g@?i@?g@@g@Bi@?e@?i@@i@@i@@g@?g@?c@@g@@k@@c@?c@@i@Be@Bg@?c@@e@Bk@?e@Ak@?[@SBi@@e@@g@?c@?i@@e@?i@?e@?g@?i@?g@@e@Ac@@g@@g@?g@@e@@g@Ag@@i@Ac@@i@@g@Be@@g@?g@?g@@e@Ee@Cc@Ig@Qe@W_@]c@]c@c@_@i@[q@Su@Iw@Go@Aw@Aw@Es@Kq@Qq@Qi@Uc@Wa@_@Sc@Ge@Ae@Ce@Cg@@e@Fi@Pe@Dg@Fg@Bi@@g@EMm@Mc@K?e@@g@?i@Bg@?g@Bg@d@]Pe@^[b@[p@Mv@?r@Gv@Bn@Jv@?t@Cn@?t@@r@?t@@n@?r@?t@Al@Ap@It@Av@Cr@Fv@Gt@Ix@Kt@Ep@Ix@Kl@Mp@Av@Ar@Bl@Lr@Bt@Kt@Bt@Kr@At@Bn@Hx@Ax@?r@Ad@\dAg@l@@Kn@m@m@XYv@Dp@Tn@Rv@Dz@Ll@Vt@V`@^fALd@Fh@FRFJ?p@Hn@?FCr@Dr@@t@?n@XDANGt@?p@Cl@Kl@Yr@ANA^In@GRXFHx@Fp@Tx@Zv@TLDHEp@C`@c@VD@Dp@Fp@Bt@BJAB_@j@K`@\F?v@Kf@i@r@Ap@Nn@Gl@?FXNh@^`@b@X`@Z^`@\`@`@b@Zb@`@NCCIEJq@@GEOWe@_@[s@Km@Sg@Yg@][QCKq@I}@d@q@]q@Ii@_@c@k@i@Wm@DAFE@m@Gy@Bw@MQg@CUQk@[c@w@?W@k@]wAvBk@b@m@Za@bAKHSRj@IDDRXv@q@t@h@d@p@l@Zh@Nn@Ff@sAPm@FCv@Pp@Ml@[VQ@Ux@Gr@Rt@It@An@Jp@QFF@~Ct@G^qAl@GJn@h@fBzAoDl@P?DIn@?Ek@_@Es@@w@Ke@Mm@Qg@Ym@mAX]NUPy@bCSFjARd@YRt@Op@_@`@kAHgAB[A',
        startTime: Date.now(),
        endTime: Date.now() + 1000
      }
    ),
  ]);

  await activities[0].setUser(1);
  await activities[1].setUser(2);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${activities.length} activities`);


  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
