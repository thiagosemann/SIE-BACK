const { Client } = require('ldapts');

async function checkLdapUser(username, password, ldapServer = 'ldap.cbm.sc.gov.br') {
  let erroLdap = '';
  const client = new Client({
    url: `ldap://${ldapServer}`
  });

  try {
    await client.bind('', '');

    const opts = {
      filter: `(uid=${username})`,
      scope: 'sub',
      attributes: ['dn','employeenumber', 'cpf']
    };
    const res = await client.search('ou=Users,dc=cbm,dc=sc,dc=gov,dc=br', opts);
    if (res.searchEntries.length !== 1) {
      erroLdap += `ERRO: USUÁRIO ${username} EXISTE MAIS DE UM USUÁRIO\n`;
      throw new Error('More than one user found');
    }

    const user = {
      dn: res.searchEntries[0].dn,
      employeenumber: res.searchEntries[0].employeeNumber,
      cpf: res.searchEntries[0].cpf.length > 0 ? res.searchEntries[0].cpf[0] : ''
    };
    if (password !== '') {
      await client.bind(user.dn, password);
    }

    client.unbind();
    return { success: true, error: '', user };
  } catch (err) {
    erroLdap += `NÃO FOI POSSÍVEL ESTABELECER A CONEXÃO: '${ldapServer}'\n`;
    erroLdap += `ERRO: ${err.message}\n`;
    client.unbind();
    return { success: false, error: erroLdap };
  }
}

module.exports = {
  checkLdapUser
};

