using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webapiproj.Models;

namespace UnitTestProject.DBSET
{
    class TestVideokartyaDbSet: TestDbSet<Videokartya>
    {
        public override Videokartya Find(params object[] keyValues)
        {
            return this.SingleOrDefault(x => x.Id == (int)keyValues.Single());
        }
    }
}
